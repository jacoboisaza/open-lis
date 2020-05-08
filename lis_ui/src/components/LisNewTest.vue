<template>
  <div>
    <v-card-title class="orange--text">
      <v-icon color="orange">mdi-test-tube</v-icon> New test
    </v-card-title>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            clearable
            type="number"
            label="Barcode"
            prepend-icon="mdi-barcode-scan"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "LisNewTest",
  data: () => ({})
};
</script>
