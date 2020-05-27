<template>
    <div id="about" class="about">
        <app-header />
        <div class="about-inner">
            <h1 class="main">Take a moment to
                <span data-title="share your pandemic experience">
                    <router-link to="/submit">share your pandemic experience</router-link>
                </span> or discover
                <span>
                    <router-link to="/responses">what the rest of the world is going through</router-link>
                </span>.
            </h1>
            <h1>While this platform does not provide a cure for the virus, healing for those mourning or medicine for the sick, it was built in the hope that it will lift your spirit and make you feel a little more connected to the rest of the world during this pandemic.
            </h1>
        </div>
        <app-footer />
    </div>
</template>

<script>
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>
    


