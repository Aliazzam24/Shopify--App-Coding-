<template>

    <div class="Polaris-Frame-ContextualSaveBar__Contents">


        <div class="Polaris-Frame-ContextualSaveBar__MessageContainer">
            <span class="Polaris-Icon">
                <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 6.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 1 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z"></path><path d="M11 13.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path><path fill-rule="evenodd" d="M10 3.5c-1.045 0-1.784.702-2.152 1.447a449.26 449.26 0 0 1-2.005 3.847l-.028.052a403.426 403.426 0 0 0-2.008 3.856c-.372.752-.478 1.75.093 2.614.57.863 1.542 1.184 2.464 1.184h7.272c.922 0 1.895-.32 2.464-1.184.57-.864.465-1.862.093-2.614-.21-.424-1.113-2.147-2.004-3.847l-.032-.061a429.497 429.497 0 0 1-2.005-3.847c-.368-.745-1.107-1.447-2.152-1.447Zm-.808 2.112c.404-.816 1.212-.816 1.616 0 .202.409 1.112 2.145 2.022 3.88a418.904 418.904 0 0 1 2.018 3.875c.404.817 0 1.633-1.212 1.633h-7.272c-1.212 0-1.617-.816-1.212-1.633.202-.408 1.113-2.147 2.023-3.883a421.932 421.932 0 0 0 2.017-3.872Z"></path></svg>
            </span>
            <h2 class="Polaris-Text--root Polaris-Text--headingMd Polaris-Text--block Polaris-Text__text--inverse Polaris-Text--truncate">{{ title }}</h2>
        </div>


        <div class="Polaris-Frame-ContextualSaveBar__ActionContainer">
            <div class="Polaris-LegacyStack Polaris-LegacyStack--spacingTight Polaris-LegacyStack--noWrap">



<!--                discard button-->
                <div @click="discard"  class="Polaris-LegacyStack__Item">
                    <button class="Polaris-Button Polaris-Button--pressable Polaris-Button--variantTertiary Polaris-Button--sizeLarge Polaris-Button--textAlignCenter" type="button">
                        <span class="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--medium">Discard</span>
                    </button>
                </div>




<!--                v-if submit show spinner and disabled -->
                <div  class="Polaris-LegacyStack__Item">


                    <div class="Polaris-LegacyStack__Item">
                        <button :disabled="processing"  class="Polaris-Button Polaris-Button--pressable Polaris-Button--variantPrimary Polaris-Button--sizeLarge Polaris-Button--textAlignCenter Polaris-Button--toneSuccess" aria-disabled="false" type="submit">
                            <span  v-if="!processing"  class="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--medium">Save</span>
                            <span v-else class="spinner-polaris-style">
                                <Spinner size="small" />
                            </span>

                        </button>
                    </div>

                </div>


            </div>
        </div>



    </div>

</template>

<style scoped>
.spinner-polaris-style{
    padding-right: 2px;
    padding-left: 2px;
}
</style>

<script>
import SpinnerButton from "@/Shared/PolarisButton/SpinnerButton.vue";

export default {
    components: {SpinnerButton},
    props: {

        title: {
            type: String,
            default: ""
        },

        processing: { //v-if
            type: Boolean, required: true
        },
    },

    methods: {
        discard() {
            this.$emit('discard');
        },
    }
};
</script>
