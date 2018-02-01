<template>
    <div id="app">
        <div class="language-picker" :class="{loading: loadingLanguage}">
            <button
                v-for="language in languages" :key="language.id" 
                class="language-btn" :class="{active: language.id === currentLanguage.id}"
                @click="setLanguage(language)">
                <img :src="language.flag" alt="" class="language-btn__flag">
                {{ language.name }}
            </button>
        </div>
        <div class="pages" :class="pagesClass">
            <profile-screen
                :class="page.profile" class="pg-profile"
                :picture="profile.picture"
                :title="profile.title"
                :paragraphs="profile.paragraphs"
                :traits="profile.traits"
                />
            <skills-screen
                :class="page.skills" class="pg-skills"
                :title="skills.title"
                :skills="skills.skills"
                />
            <samples-screen
                :class="page.samples" class="pg-samples"
                :title="samples.title"
                :samples="samples.samples"
                />
            <contact-screen
                :class="page.contact" class="pg-contact"
                :title="contact.title"
                :email="contact.email"
                :presence="contact.presence"
                />
        </div>
        <div class="bullets">
            <div
                v-for="(page, index) in pages"
                :key="page"
                class="bullet"
                :class="{active: index === pageIndex}"
                @click="transitionTo(index)"
                ></div>
        </div>
    </div>
</template>

<script>
    import ProfileScreen from './screens/Profile';
    import SkillsScreen from './screens/Skills';
    import SamplesScreen from './screens/Samples';
    import ContactScreen from './screens/Contact';
    import languages from './content/languages';

    export default {
        name: 'app',
        props: {
            content: Object
        },
        data: () => ({
            pages: ['profile', 'skills', 'samples', 'contact'],
            pageIndex: 0,
            inTransition: false,
            loadingLanguage: false,
            languages: languages,
            currentLanguage: {},
            profile: {},
            contact: {},
            skills: {},
            samples: {}
        }),
        computed: {
            page() {
                const pagesObj = {};
                for(let i = 0; i < this.pages.length; i++) {
                    const pagename = this.pages[i];
                    pagesObj[pagename] = {
                        pre: (i < this.pageIndex),
                        post: (i > this.pageIndex)
                    }
                }
                return pagesObj;
            },
            pageName() {
                return this.pages[this.pageIndex];
            },
            pagesClass() {
                return { ['page-' + this.pageName]: true };
            }
        },
        methods: {
            nextPage() {
                if (this.pageIndex + 1 >= this.pages.length) return;
                this.transitionTo(this.pageIndex + 1);
            },
            prevPage() {
                if (this.pageIndex <= 0) return;
                this.transitionTo(this.pageIndex - 1);
            },
            transitionTo(index) {
                this.inTransition = true;
                this.pageIndex = index;
                setTimeout(() => { this.inTransition = false; }, 350);
            },
            setLanguage(language) {
                this.loadingLanguage = true;
                fetch('/set-language', {
                    method: 'POST',
                    body: JSON.stringify({ id: language.id }),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then((res) => res.json())
                .then((propsData) => {
                    this.loadingLanguage = false;
                    for(let k in propsData) {
                        this[k] = propsData[k];
                        this.$set(this, k, propsData[k]);
                    }
                    this.updateLanguageCookie();
                    this.$forceUpdate();
                });
            },
            updateLanguageCookie() {
                // Date 30 days into the future
                var d = new Date();
                d.setTime(d.getTime() + (30*24*60*60*1000));

                // Expiration date string
                var expires = d.toUTCString();

                // Set Cookie
                document.cookie = `lng=${this.currentLanguage.id};expires=${expires}`;
            }
        },
        mounted() {
            window.addEventListener('wheel', (e) => {
                if (this.inTransition) return;
                if (!e.deltaY) return;

                if (e.deltaY > 0) this.nextPage();
                else this.prevPage();
            });
            this.updateLanguageCookie();
        },
        created() {
            this.profile = this.content.profile;
            this.skills = this.content.skills;
            this.samples = this.content.samples;
            this.contact = this.content.contact;
            this.currentLanguage = this.content.currentLanguage;
        },
        components: {
            ProfileScreen,
            SkillsScreen,
            SamplesScreen,
            ContactScreen
        }
    }
</script>

<style lang="scss">
    @import './scss/variables';
    @import './scss/fonts';
    @import './scss/animations';

    body {
        background-color: $color-background;
        color: $color-text;
        font-family: $font-family-body;
        font-size: 14px;
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }

    h1, h2, h3, h4 {
        font-family: $font-family-heading;
        margin: 0;
    }

    p {
        margin: 0;
    }

    p + p,
    h1 + p,
    h2 + p,
    h3 + p,
    h4 + p {
        margin-top: 0.7em;
    }

    @media (min-width: 900px) {
        .page {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transition: ease .7s transform;
            overflow: hidden;

            display: flex;
            align-items: center;
            justify-content: center;

            &.pre {
                transform: translateY(-100vh);
            }

            &.post {
                transform: translateY(100vh);
            }
        }
    }

    .page-content.loading {
        &::before {
            content: 'Loading';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: $font-family-heading;
            font-size: 20px;
            animation: pulse 1.5s ease-in-out infinite;
        }
        &::after {
            content: '';
            display: block;
            width: 150px;
            height: 150px;
            border: solid rgba(255,255,255,0.2) 2px;
            border-top-color: #FFF;
            border-radius: 50%;
            animation: spin 2s linear infinite;
        }
    }

    @media (max-width: 899px) {
        .page {
            padding-top: $gutter * 5;
            padding-bottom: $gutter * 5;
        }
    }
</style>

<style lang="scss" scoped>
    @import './scss/variables';

    .language-picker {
        z-index: 100;
        position: fixed;
        top: $gutter / 2;
        right: $gutter /2;

        &::before {
            content: '';
            position: absolute;
            top: 100%;
            left: 0%;
            height: 3px;
            background-color: #FFF;
            border-radius: 2px;
            width: 5%;
            opacity: 0;
            transition: opacity ease-in-out 0.3s;
        }

        &.loading {
            pointer-events: none;

            &::before {
                animation: sliding linear 1.5s infinite;
                opacity: 1;
            }
        }

        .language-btn {
            padding: 0;
            background-color: transparent;
            border: 0;
            color: transparent;
            font-size: 0;
            padding: $gutter / 2;
            cursor: pointer;
            outline: none;

            &__flag {
                height: 16px;
                width: 24px;
                object-fit: cover;
                border-radius: 6px;
                border: solid rgba(0, 0, 0, 0.25) 1px;
                opacity: .75;
                transition: all ease-in-out 0.4s;
            }
        }

    }

    .language-btn {
        &.active &__flag {
            border-color: rgba(255, 255, 255, 0.75);
            opacity: 1;
        }

        &:hover &__flag {
            border-color: rgba(255, 255, 255, 1);
            opacity: 1;
        }
    }

    .pages {
        transition: ease background-color 0.5s;

        @media (min-width: 900px) {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            &.page-profile {
                background-color: #29485c;
            }
            &.page-skills {
                background-color: #318a7c;
            }
            &.page-samples {
                background-color: #e58a35;
            }
            &.page-contact {
                background-color: #e35739;
            }
        }

        @media (max-width: 899px) {
            .pg-profile.page {
                background-color: #29485c;
            }
            .pg-skills.page {
                background-color: #318a7c;
            }
            .pg-samples.page {
                background-color: #e58a35;
            }
            .pg-contact.page {
                background-color: #e35739;
            }
        }
    }

    .bullets {
        position: fixed;
        left: $gutter;
        top: 50%;
        transform: translateY(-50%);

        @media (max-width: 899px) {
            display: none;
        }
    }

    .bullet {
        position: relative;
        width: 40px;
        height: 40px;
        cursor: pointer;

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: block;
            border: solid #FFF 3px;
            border-radius: 50%;
            transition: padding ease 0.5s;
        }

        &:hover::before {
            padding: 2px;
        }

        &.active {
            cursor: default;
            pointer-events: none;

            &::before {
                padding: 4px;
            }
        }
    }
</style>

