<template>
    <div id="app">
        <vue-page-transition>
            <router-view/>
        </vue-page-transition>
        <div class="app-copyright-bar">
            <small>&copy; 2020. A project by
                <a href="https://www.linkedin.com/in/daraolayebi/" target="_blank" class="link"> Dara Olayebi</a>.
            </small>
        </div>
    </div>
</template>

<script>
import reset from "./assets/app.css";
export default {};
</script>
