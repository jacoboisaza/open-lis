<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="users"
      sort-by="created"
      :sort-desc="true"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>EDIT USERS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="editedItemModal" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >New User</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">
                  {{ formTitle }}
                </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <!-- Header -->
                  <v-row v-if="editedItem.id">
                    <span class="primary--text"> ID: {{ editedItem.id }} </span>
                    <v-spacer></v-spacer>
                    <span class="text--disabled">
                      created @{{ editedItem.created }}
                    </span>
                  </v-row>

                  <!-- Roles -->
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-switch
                        v-model="editedItem.roles"
                        label="Is Client"
                        value="client"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-switch
                        v-model="editedItem.roles"
                        label="Is Lab"
                        value="lab"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-switch
                        v-model="editedItem.roles"
                        label="Is Admin"
                        value="admin"
                      ></v-switch>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="3">
                      <v-text-field
                        v-model="editedItem.app_id"
                        label="Username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="5">
                      <v-text-field
                        v-model="editedItem.email"
                        label="email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <template v-if="editedItem.id">
                  <v-btn
                    color="red darken-1"
                    text
                    @click="deleteItem(editedItem)"
                    >Delete</v-btn
                  >
                  <v-btn
                    color="red darken-1"
                    :text="editedItem.status != 'locked'"
                    @click="lockItem(editedItem)"
                    >{{
                      editedItem.status === "locked" ? "locked" : "lock"
                    }}</v-btn
                  >
                </template>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Close</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <!-- Created collumn -->
      <template v-slot:item.created="{ item }">
        {{ new Date(item.created).toDateString() + " (" + item.id + ")" }}
      </template>

      <!-- Actions collumn -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon
          :color="item.status === 'locked' ? 'error' : ''"
          small
          @click="lockItem(item)"
        >
          {{ item.status === "locked" ? "mdi-lock" : "mdi-lock-open" }}
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import userApi from "@/services/User.js";

export default {
  name: "Admin",
  data: () => ({
    editedItemModal: false,
    headers: [
      { text: "Username", value: "app_id" },
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Roles", value: "roles" },
      { text: "Created (id)", value: "created" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      app_id: "",
      name: "",
      email: "",
      roles: [],
      created: "",
      status: "ok"
    },
    defaultItem: {
      id: 0,
      app_id: "",
      name: "",
      email: "",
      created: "",
      status: "ok"
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    }
  },

  watch: {
    editedItemModal(val) {
      // Close on modal dismiss
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      userApi.all({ roles: "lab" }).then(response => {
        this.users = response.data;
      });
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItemModal = true;
    },
    lockItem(item) {
      const that = this,
        selectedItem = that.users.filter(user => {
          return user.id === item.id;
        })[0],
        index = that.users.indexOf(selectedItem),
        newStatus = selectedItem.status === "locked" ? "ok" : "locked";
      if (index > -1) {
        // Toggle status
        item.status = newStatus;
        selectedItem.status = newStatus;
        userApi.edit(selectedItem);
      }
    },
    deleteItem(item) {
      const that = this,
        selectedItem = that.users.filter(user => {
          return user.id === item.id;
        })[0],
        index = that.users.indexOf(selectedItem);
      if (index > -1) {
        userApi.delete(selectedItem).then(response => {
          that.users.splice(index, 1);
          that.close();
        });
      }
    },
    close() {
      this.editedItemModal = false;
      this.$nextTick(() => {
        // wait for the DOM update
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // Edit and Create actions
    save() {
      const that = this;
      if (that.editedIndex > -1) {
        // Copy data for the callback
        const editedIndex = that.editedIndex;
        const editedItem = Object.assign({}, that.editedItem);
        userApi.edit(that.editedItem).then(response => {
          Object.assign(that.users[editedIndex], editedItem);
        });
      } else {
        userApi.add(that.editedItem).then(response => {
          that.users.push(response.data);
        });
      }
      that.close();
    }
  }
};
</script>
