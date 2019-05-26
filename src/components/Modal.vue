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
                    I'm a fullstack developer who specializes in node.js, I'm currently attempting to learn Go, and Elixir to advance my skill set.<br>
                    <br>
                    I'm not very good at frontend design work, but I'm learning more about Vue everyday, this site was actually created using Vue from the knowledge I gained while working on Notify.me
                    <br><br>
                    I consider myself a fullstack developer not because I can design a UI. But mainly because I do a lot of functional frontend work which wouldn't class under backend.
                    <br><br>
                    But where I really shine is system administration, anything linux based. But in my downtime I am learning more about other tools to make myself useful in other environments though.
                    <br>
                    I'm pretty knowledgeable in the world of cloud infrastructure as well with services like Google Cloud.
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
