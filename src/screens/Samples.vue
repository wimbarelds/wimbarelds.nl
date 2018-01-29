<template>
    <div class="page">
        <div class="page-content">
            <h1>{{ title }}</h1>
            <div class="samples">
                <a v-for="sample in samples" :href="sample.link" :key="sample.name" target="_blank" class="sample" rel="noopener">
                    <img :src="sample.image" alt="">
                    <h3>{{ sample.name }}</h3>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        samples: Array
    }
}
</script>

<style lang="scss" scoped>
    h1 {
        text-align: center;
    }

    .sample {
        float: left;
        display: block;
        margin: 30px;
        padding: 10px;
        transition: background-color ease-in-out 0.5s;
        text-align: center;
        color: #FFF;
        text-decoration: none;
        border-radius: 10px;
        max-width: calc(50% - 60px);

        img {
            max-width: 100%;
        }

        &:nth-child(odd) {
            content: '';
            clear: both;
            display: block;
        }

        &:hover {
            background-color: rgba(0,0,0,0.5);
        }
    }

    .page-content {
        text-align: center;
    }

    .samples {
        display: inline-block;

        &::after {
            content: '';
            display: block;
            clear: both;
        }
    }
</style>

