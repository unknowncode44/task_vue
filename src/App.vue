<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { MoonIcon, SunIcon, LinkIcon } from '@heroicons/vue/24/solid'
import { useThemeStore } from '@/stores/ThemeStore'
import { useSesionStore } from '@/stores/AuthSesionStore'

const useStore = useThemeStore() 
const theme =  reactive(useStore)

const sesionStore = useSesionStore()
const sesion = reactive(sesionStore)




</script>

<template>
  <div v-bind:class="theme.isDark ? 'dark' : ''" class="wrapper transition ease-linear">
    <div class="btn-wrapper z-10">
      <div class="toggle-btn flex items-center justify-center w-full my-4">
        <label for="toggle" class="flex items-center justify-center cursor-pointer">
          <div class="relative">
            <input type="checkbox" id="toggle" class="sr-only" @click="theme.toggleTheme"/>
            <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div
              class="dot absolute left-1 top-1 bg-black w-6 h-6 flex items-center justify-center rounded-full transition">
              <!-- usar directiva v-if  para mostrar el icono de luna o sol -->
              <MoonIcon v-if="!theme.isDark" class="w-4 h-4 text-white" />
              <SunIcon v-if="theme.isDark" class="w-full h-full text-yellow-500 p-1" />
            </div>
          </div>

          <!-- cambiar el texto segun sea Light o Dark mode -->
          <div v-bind:class="theme.isDark ? 'dark' : ''" class="label-text ml-2 font-medium">
            {{ theme.mode }}
          </div>
        </label>
      </div>
    </div>
    <div v-show="sesion.data?.user?.email===undefined? false : true" class="btn-wrapper-left z-10">
      <div class="toggle-btn flex items-center justify-center w-full my-4">
        <button @click="sesion.logout" :class="theme.isDark ? 'hover:bg-blue-100 focus:ring-blue-200 bg-blue-50' : 'hover:bg-blue-100'" class="w-full text-dark bg-blue-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-3 text-center min-h-[32px]">
          Cerrar Sesion
        </button>
      </div>
    </div>
    <div v-bind:class="theme.isDark ? 'dark' : ''" class="img min-h-screen flex flex-col items-center transition"></div>
      <div class="todo lg:w-2/3 xl:w-2/5 w-full px-7">
        <RouterView />
      </div>
  </div>
  <div class="absolute bottom-0 w-full h-20 flex flex-col justify-center items-center bg-slate-500 text-xl font-semibold">
    <div class="unknowncode"><span class="font-light mx-2">by</span>unknown<span class="text-gray-200 font-normal">code</span>44</div>
    <p class="text-sm font-normal">Matias Orellana 2024</p>
    <a class="text-sm font-normal text-white cursor-pointer flex flex-row justify-around items-center" href="https://github.com/unknowncode44"><LinkIcon class="h-3 w-3 mx-2"/> GitHub</a>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  background: #fff;
}

.wrapper.dark {
  background: #434343;
}

.img {
  background-image: url('https://github.com/cloworm/todo/blob/master/public/images/bg-desktop-light.jpg?raw=true');
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
}

.img.dark {
  background: url('https://github.com/cloworm/todo/blob/master/public/images/bg-desktop-dark.jpg?raw=true');
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
}

.btn-wrapper {
  position: absolute;
  right: 16px;

}

.btn-wrapper-left {
  position: absolute;
  left: 16px;
}

input:checked~.dot {
  transform: translateX(100%);
  background-color: rgb(77, 148, 255);
}

.label-text {
  color: white;
}

.label-text.dark {
  color: black;
}

.todo {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1000;
}
</style>
