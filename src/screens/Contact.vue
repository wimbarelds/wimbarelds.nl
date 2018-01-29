<template>
    <div class="page">
        <div class="page-content">
            <h1>{{ title }}</h1>
            <div class="contact">
                <div class="contact-email">
                    <label>Email:</label>
                    <a :href="'mailto:' + email" target="_blank" rel="noopener">{{ email }}</a>
                </div>
                <div class="contact-presence">
                    <a v-for="item in presence" :key="item.name" :href="item.link" target="_blank" class="presence-item" rel="noopener">
                        <img :src="item.image" alt="">
                        <label v-text="item.name"></label>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        email: String,
        presence: Array
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/variables';

    h1 {
        text-align: center;
    }

    .contact-email {
        padding: $gutter 0;
        text-align: center;

        label {
            font-family: $font-family-heading;
        }

        a {
            color: #FFF;
            opacity: .75;
            transition: opacity ease-in-out 0.3s;
            text-decoration: none;

            &:hover {
                opacity: 1;
            }
        }
    }

    .contact-presence {
        display: flex;
        justify-content: space-between;
        max-width: 300px;
        margin: auto;
    }

    .presence-item {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: $gutter;
        border-radius: 5px;
        width: 100px;
        transition: all ease-in-out 0.5s;
        
        img {
            width: 50px;
            height: 50px;
            margin-bottom: 10px;
        }
        label {
            font-family: $font-family-heading;
            color: #FFF;
        }

        &:hover {
            background-color: #000;
            filter: invert(1);
            transition: filter ease-in-out 0.4s,  background-color ease-in-out 0.5s 0.15s;
        }
    }
</style>

