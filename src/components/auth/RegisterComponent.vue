<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { useSesionStore } from '@/stores/AuthSesionStore'

import SpinnerComponent  from '@/components/SpinnerComponent.vue'

import type { CredentialsModel } from '@/models/CredentialsModel'

const useTheme = useThemeStore() 
const theme = reactive(useTheme)

const useSesion = useSesionStore()
const sesion = reactive(useSesion)

const newCredentials: CredentialsModel = {
    email: '',
    password: ''
}

const repeatPwd: string = ''
const rptPwd = ref(repeatPwd)

const credentials = reactive(newCredentials)

async function logCredentials() {
    if(rptPwd.value === newCredentials.password) {
        await sesion.registerUser(newCredentials)
    }
    else {
        console.error('Las Contrasenas No coinciden')
    }
}

</script>
<template>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 :class="theme.isDark ? 'text-blue-100' : 'text-gray-900'" class="text-xl font-semibold leading-tight tracking-tight md:text-2xl ">
            Registrate
        </h1>
    </div>
    <form @submit.prevent="logCredentials" class="p-6 space-y-4 md:space-y-6 sm:p-8" action="#">
        <div>
            <label :class="theme.isDark ? 'text-blue-100' : 'text-gray-900'" for="email" class="block mb-2 text-sm font-medium">Tu Email</label>
            <input v-model="newCredentials.email" :class="theme.isDark ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900'" type="email" name="email" id="email" class=" border  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required>
        </div>
        <div>
            <label :class="theme.isDark ? 'text-blue-100' : 'text-gray-900'" for="password" class="block mb-2 text-sm font-medium">Password</label>
            <input v-model="newCredentials.password" :class="theme.isDark ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900'" type="password" name="password" id="password" class=" border  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="••••••••" required>
        </div>
        <div>
            <label :class="theme.isDark ? 'text-blue-100' : 'text-gray-900'" for="confirm-password" class="block mb-2 text-sm font-medium">Repite Password</label>
            <input v-model="rptPwd" :class="theme.isDark ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900'" type="password" name="confirm-password" id="confirm-password" class=" border  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="••••••••" required>
        </div>
        <div class="my-4"></div>
        <button type="submit" :class="theme.isDark ? 'hover:bg-blue-700 focus:ring-blue-800 bg-blue-600' : 'hover:bg-blue-700'" class="w-full text-white bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-3 min-h-[54px] text-center">
            <p v-show="!sesion.loading" class="m-0 p-0 text-center">Registrar</p>
            <SpinnerComponent v-show="sesion.loading" />
        </button>
    </form>
</template>


<style scoped>

</style>