<template>
    <transition name="modal-fade">
        <div class="modal-main" v-shortkey="['esc']" @shortkey="close">
            <div class="modal" v-if="screen == 'about'">
                <div class="modal-header">
                    <h1>About</h1>
                </div>
                <div class="modal-body about">
                    Hi there, I'm Tetrabyte also known as Dustin Rouillard.<br>
                    <br>
                    I'm a back-end developer who specializes in node.js and who is familiar with front-end work, I'm currently attempting to learn Go, and Elixir to advance my skill set.<br>
                    <br>
                    I'm not very good at frontend work, but I'm learning more about Vue everyday, this site was actually created using Vue from the knowledge I gained while working on Notify.me
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
                        <Project class="project" v-for="(project, index) in projects" v-bind:key="index" :project="project"/>
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
                        <Contribution class="contribution" v-for="(contribution, index) in contributions" v-bind:key="index" :contribution="contribution"/>
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
import Projects from '@/assets/projects.js';
import Contributions from '@/assets/contributions.js';

import Project from '@/components/items/Project.vue';
import Contribution from '@/components/items/Contribution.vue';

export default {
    name: 'modal',
    props: ["screen"],
    data() {
        return {
            projects: Projects,
            contributions: Contributions
        }
    },
    components: {
        Contribution,
        Project
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>