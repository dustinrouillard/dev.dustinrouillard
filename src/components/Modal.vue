<template>
  <transition name="modal-fade">
    <div class="modal-main" v-shortkey="['esc']" @shortkey="close">
      <div class="modal" v-if="screen == 'about'">
        <div class="modal-header">
          <h1>About</h1>
        </div>
        <div class="modal-body about">
          Hello there, I'm Dustin Rouillard, I'm 20 and I currently live in
          Vancouver, British Colombia, but might potentially be moving to Los
          Angeles sometime next year.
          <br />
          <br />I'm a fullstack developer who specializes in Node.js, I'm
          currently attempting to learn Go to advance my skill set.
          <br />
          <br />I'm not very good at frontend design work, but it's a learning
          process, this site was actually created using Vue from the knowledge I
          gained while working on Notify.me
          <br />
          <br />I consider myself a fullstack developer not because I can design
          a UI. But mainly because I do a lot of functional frontend work which
          wouldn't class under backend.
          <br />
          <br />But where I really shine is in systems administration, anything
          linux based. But in my freetime I am learning more about other tools
          to make myself useful in other environments.
          <br />
          <br />I'm in the process of learning anything and everything there is
          to know about cloud infrastructure, and how all that works. I'm really
          interested in Kubernetes personally.
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="button" @click="close">Close</button>
          </slot>
        </footer>
      </div>
      <div class="modal" v-if="screen == 'domains'">
        <div class="modal-header">
          <h1>Domains</h1>
        </div>
        <div class="modal-body">
          <draggable class="domains" draggable=".domain">
            <transition-group>
              <Domain
                class="domain"
                v-for="domain in domains"
                v-bind:key="domain.domain"
                :domain="domain"
              />
            </transition-group>
          </draggable>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="button" @click="close">Close</button>
          </slot>
        </footer>
      </div>
      <div class="modal" v-if="screen == 'projects'">
        <div class="modal-header">
          <h1>Projects</h1>
        </div>
        <div class="modal-body">
          <div class="projects">
            <Project
              class="project"
              v-for="(project, index) in projects"
              v-bind:key="index"
              :project="project"
            />
          </div>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="button" @click="close">Close</button>
          </slot>
        </footer>
      </div>
      <div class="modal" v-if="screen == 'contributions'">
        <div class="modal-header">
          <h1>Contributions</h1>
        </div>
        <div class="modal-body">
          <div class="contributions">
            <Contribution
              class="contribution"
              v-for="(contribution, index) in contributions"
              v-bind:key="index"
              :contribution="contribution"
            />
          </div>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="button" @click="close">Close</button>
          </slot>
        </footer>
      </div>
      <div class="modal-backdrop" @click="close" />
    </div>
  </transition>
</template>

<script>
import draggable from "vuedraggable";

import Projects from "@/assets/projects.js";
import Contributions from "@/assets/contributions.js";
import Domains from "@/assets/domains.js";

import Project from "@/components/items/Project.vue";
import Contribution from "@/components/items/Contribution.vue";
import Domain from "@/components/items/Domain.vue";

export default {
  name: "modal",
  props: ["screen"],
  data() {
    return {
      projects: Projects,
      contributions: Contributions,
      domains: Domains
    };
  },
  components: {
    draggable,
    Contribution,
    Project,
    Domain
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>
