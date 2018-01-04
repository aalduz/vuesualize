<template>
    <div @click="focusOnInput" class="form-group">
        <label for="tags"><slot class="label">Journey Tags</slot></label>
        <div class="tags-input">
            <span
                v-for="(tag, index) in tags"
                @click="removeTag(index)"
                class="badge badge-pill badge-warning">{{ tag }}
                <span class="close-x">x</span>
            </span>
            <input v-model="tagsInput" 
                ref="tagsInput"
                @keyup.space="getTag"
                @keyup.comma="getTag"
                type="text" class="form-control"
                id="tags"
                aria-describedby="tags"
                placeholder="You can create tags">
        </div>
        <small id="tagsHelp" class="form-text text-muted"><slot name="help">Tags are useful to filter between your journeys.(Use spaces or ',' as delimiters)</slot></small>
    </div>
</template>

<script>
    export default {
        props: ['tags'],
        data () {
            return {
                tagsInput: ''
            }
        },
        methods: {
            getTag () {
                let tagsInput = this.tagsInput;
                tagsInput = tagsInput.replace(/ +/g,"_").slice(0, -1);

                let processedTag = tagsInput.split('_')[0];

                if (processedTag != '') {
                    this.$emit('newTag', processedTag);
                }
                this.tagsInput = '';

            },
            removeTag: function(index) {
                this.$emit('removeTag', index);
            },
            focusOnInput: function() {
                this.$refs.tagsInput.focus();
            },
        }
    }
</script>

<style lang="scss">
    @import "../../styles/index";
    .tags-input {
        background-color: map-get($brand-palette, main-background);
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        display: inline-block;
        padding: 3px 12px;
        color: #ccc;
        vertical-align: middle;
        border-radius: 4px;
        width: 100%;
        max-width: 100%;
        line-height: 22px;
        cursor: text;

    }
    .tags-input span.badge {
        margin-right: 5px;
        cursor: pointer;

        &:hover {
            span.close-x {
                color: white;
            }
        }
    }
    .tags-input span.badge span.close-x {
        padding-left: 3px;
    }
    .tags-input input {
        border: none;
        box-shadow: none;
        outline: none;
        background-color: transparent;
        padding: 3px 6px 3px 0;
        margin: 0;
        width: auto;
        max-width: inherit;
        display: inline-block;
        color: #ccc;
    }
    .tags-input input:focus {
        outline: 0;
        border:none;
        box-shadow:none;
        background-color: transparent;
        color: #ccc;
    }
</style>