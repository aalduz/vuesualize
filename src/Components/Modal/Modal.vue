<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header"></slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button v-if="confirmCancel" class="btn btn-default" @click="$emit('cancel')">Cancel</button>
                            <button v-if="confirmCancel" class="btn btn-primary" @click="$emit('confirm')"><slot name="confirm-text">Confirm</slot></button>
                            <button v-else class="btn btn-primary" @click="$emit('ok')">OK</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: ['autoDismiss', 'confirmCancel'],
    mounted: function () {
        if (this.autoDismiss) {
            let vm = this;
            setTimeout(function() {
                vm.$emit('dismiss');
            },3000);
        }
    }
};
</script>

<style lang="scss">
@import "../../styles/index";
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 15px;
  background-color: map-get($brand-palette, main-background);
  border-radius: 2px;
  border: 1px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  color: white;

  @media (min-width: 572px) {
      width: 50%;
  }

  @media (min-width: 1199px) {
      width: 500px;
  }

  .modal-header {
        padding: 15px 0;

        h3 {
            margin-top: 0;
            text-align: center;
            width: 100%;
            color: map-get($brand-palette, primary);
        }
  }

  .modal-body {
      margin: 0;

      p.center {
          text-align: center;
      }
  }

  .modal-footer {
      margin: 0;
      padding: 15px 0;

      button.btn {
          cursor: pointer;

          &.btn-default {
              border: 1px solid white;
          }

          &:hover {
            background-color: map-get($brand-palette, main-background);
            color: white;
          }
      }
  }

  .modal-default-button {
    float: right;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>


