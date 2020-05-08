<template>
  <div>
    <v-card-title class="purple--text">
      <v-icon color="purple">mdi-account-plus</v-icon>New patient
    </v-card-title>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            label="Patient's name"
            prepend-icon="mdi-account"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "LisNewPatient",
  data: () => ({})
};
</script>
