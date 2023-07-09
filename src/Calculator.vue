<script setup>
import { ref, defineProps, computed, watch, onMounted, nextTick, toRefs } from "vue";

const props = defineProps([
    'keisanki',
]);
const emits = defineEmits([
    'keisanChanged',
]);
const keisanki = ref(props.keisanki);

function formatForEval(s) {
    if (s.indexOf("=") >= 0) {
        return "";
    }
    if (s.indexOf("'") >= 0) {
        return "";
    }
    if (s.indexOf('"') >= 0) {
        return "";
    }
    if (s.indexOf('`') >= 0) {
        return "";
    }
    s = s.replace(/÷/g, '/');
    s = s.replace(/×/g, '*');
    s = s.replace(/＋/g, '+');
    s = s.replace(/－/g, '-');
    s = s.replace(/⁻/g, '-');
    s = s.replace(/　/g, ' ');
    return s;
}

const keisanAnswer = computed(() => {
    if (!keisanki.value) {
        return;
    }

    try {
        return "=" + eval(formatForEval(keisanki.value));
    } catch (error) {
        console.error(error);
        return "計算式が不正です";
    }
});
</script>

<template>
    <div>
        <input v-model="keisanki" placeholder="簡易計算機　例：(123 + 10) * 0.05" @change="emits('keisanChanged', keisanki)" />
    </div>
    <div class="keisanKekka">
        {{ keisanAnswer }}
    </div>
</template>

<style>
.keisanKekka {
    padding-top: 3px;
}
</style>