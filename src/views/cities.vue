<template>
    <section class="history-search">
        <div class="container">
            <div class="row">
                <div class="history-content">
                    <div class="title">
                        <h1 class="mitr">
                            Your Search History
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </h1>
                    </div>
                    <div v-if="historyData.length <= 0" class="history-none">
                        <div class="error-content mt-5 text-center">
                            <h1 class="mitr color-main">Your Search History Is Empty</h1>
                        </div>
                    </div>
                    <div v-else class="history-items">
                        <transition-group name="history-items-tran">
                            <div class="item" v-for="(item, index) in historyData" :key="index">
                                <div class="item-left">
                                    <div class="item-date">
                                        <span class="mitr color-main">{{ new Date(item.date * 1000).toLocaleDateString() }} | {{ new Date(item.date * 1000).toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric' }) }}</span>
                                    </div>
                                    <div class="item-city">
                                        <i class="fa-solid fa-earth-americas"></i>
                                        <h1 class="mitr color-main">{{ item.name }}</h1>
                                    </div>
                                </div>
                                <div class="item-right">
                                    <div class="item-buttons">
                                        <button id="delete-button" class="delete-button" @click="deleteHistory(index)">
                                            <i style="--color: var(--text-color-danger);" class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'cities-page',
    data() {
        return {
            historyData: JSON.parse(localStorage.getItem('userSearchHistory'))
        }
    },
    methods: {
        deleteHistory(index) {
            try {
                this.historyData.splice(index, 1);
                localStorage.setItem('userSearchHistory', JSON.stringify(this.historyData));

                toast.success('Successfully!', {
                    autoClose: 2000,
                    theme: 'dark',
                    icon: '✅',
                    position: toast.POSITION.BOTTOM_RIGHT
                })

            } catch (error) {
                console.log('Error when removing!:', error);
                toast.error(`You are faced with an error!`, {
                    autoClose: 5000,
                    theme: 'dark',
                    position: toast.POSITION.BOTTOM_RIGHT,
                    icon: '❌',
                })
            }

        }
    },
    mounted() {
    }
}
</script>