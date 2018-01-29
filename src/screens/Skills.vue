<template>
    <div class="page">
        <div class="page-content">
            <h1>{{ title }}</h1>
            <div class="skills">
                <div class="skills-tile" v-for="skill in skills" :key="skill.name">
                    <img :src="skill.image" :alt="skill.name" :title="skill.name" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        skills: Array
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/variables';

    h1 {
        text-align: center;
    }
    .skills {
        display: inline-flex;
        flex-wrap: wrap;
        max-width: (128px * 5) + ($gutter * 20);
        justify-content: center;

        &-tile {
            padding: $gutter;
            margin: $gutter;
            transition: background-color 0.5s ease-in-out;
            border-radius: 10px;

            &:hover {
                background-color: rgba(0, 0, 0, 0.5);
            }
        }
    }
</style>

