<template>
    <div id="app">
        <vue-page-transition>
            <router-view/>
        </vue-page-transition>
        <div class="app-copyright-bar">
            <small>A mini project by
                <a href="https://www.linkedin.com/in/daraolayebi/" target="_blank" class="link"> Dara Olayebi</a>. &copy; 2020 All Rights Reserved.
            </small>
        </div>
    </div>
</template>

<script>
import reset from "./assets/app.css";
export default {};
</script>
