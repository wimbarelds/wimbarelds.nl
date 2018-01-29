<template>
    <div class="page">
        <div class="page-content">
            <div class="profile">
                <div class="profile-picture">
                    <img :src="picture" alt="">
                </div>
                <div class="profile-info">
                    <h2>{{ title }}</h2>
                    <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
                </div>
            </div>
            <div class="traits">
                <div class="trait" v-for="(trait, index) in traits" :key="index">
                    <img :src="trait.image" alt="">
                    <h3 v-text="trait.title" v-once></h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        picture: String,
        title: String,
        paragraphs: Array,
        traits: Array
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/variables';

    .profile {
        display: flex;
        padding: $gutter;

        @media (max-width: 899px) {
            flex-direction: column;
            align-items: center;
        }
    }

    @media (min-width: 900px) {
        .page-content {
            max-width: calc(100% - 80px);
        }
    }

    .profile-picture {
        padding: $gutter;

        img {
            border-radius: 50%;
            border: solid rgba(255,255,255,0.8) 2px;
            padding: 1px;
            background-color: rgba(0,0,0,.75);
        }
    }

    .profile-info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: $gutter;
        flex: 1;
    }

    .traits {
        padding: $gutter;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .trait {
        text-align: center;
        margin: $gutter;

        img {
            margin-bottom: $gutter;
            max-width: 100px;
        }
    }

</style>

