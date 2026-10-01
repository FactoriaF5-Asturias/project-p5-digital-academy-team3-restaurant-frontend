<script setup>
    import MainHeader from "../components/common/MainHeader.vue";
    import { useRoute } from "vue-router";
    import orderCheck from "../assets/ordercheck.svg"
    import { computed } from "vue";

    const route = useRoute()

    const formattedOrderNumber = computed(() => `#P5-${route.params.id}`)
</script>