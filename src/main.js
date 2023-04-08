// init app
import { createApp } from 'vue';
import App from '@/App.vue';
const app = createApp(App);

// init basic css with tailwind imports
import './main.css';

// ready? let's go!
app.mount('#app');
