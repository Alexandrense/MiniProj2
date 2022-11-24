<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Sponsor" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
              fdsfsdfds
              <table border="1"><tr v-for="sponsorItem of sponsors" :key="sponsorItem._id">
                <td class="pt-4">nome: {{sponsorItem.name}}</td>         
                </tr>
              </table>

              <select id="sltGroup" class="form-control form-control-lg" v-model="animal" required>
                <option value>-- SELECIONA GRUPO --</option>
                <option value="cao">CAO</option>
                <options v-for="sponsorItem of sponsors" :key="sponsorItem._id">
               
                <option :value="sponsorItem.animal">{{sponsorItem.animal}}</option>
                
                </options>
              </select>
            </div>
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="escreve mensagem do sponsor"
                cols="30"
                rows="10"
                v-model="description"
                required
              ></textarea>
            </div>
            
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i>  ADICIONAR</button>
            <router-link
              :to="{name: 'listSponsors'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            ><i class="fas fa-window-close"></i>  CANCELAR</router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_SPONSORS, ADD_SPONSOR } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddSponsor",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      animal: "",
      message: "",
      sponsors: []
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsors", "getMessage"])
  },
  methods: {
    fetchSponsors() {
      this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`).then(
        () => {
          this.sponsors = this.getSponsors;          
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    add() {
      this.$store.dispatch(`sponsor/${ADD_SPONSOR}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Sponsor adicionado!", "success");
          router.push({ name: "listSponsors" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
