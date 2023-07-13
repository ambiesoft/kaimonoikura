<script setup>
import { ref, computed, watch, onMounted, nextTick, toRefs } from "vue";

const props = defineProps([
    'keisanki',
    'goukei',
]);
const keisanki = ref(props.keisanki);
const goukei = ref(props.goukei);

const emits = defineEmits([
    'keisanChanged',
]);

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

    s = s.replace(/合計/g, 'goukei.value');

    s = s.replace(/÷/g, '/');
    s = s.replace(/×/g, '*');
    s = s.replace(/＋/g, '+');
    s = s.replace(/－/g, '-');
    s = s.replace(/⁻/g, '-');
    s = s.replace(/　/g, ' ');

    s = s.replace(/\[/g, '(');
    s = s.replace(/\]/g, ')');

    s = s.replace(/【/g, '(');
    s = s.replace(/\】/g, ')');

    s = s.replace(/『/g, '(');
    s = s.replace(/』/g, ')');

    s = s.replace(/「/g, '(');
    s = s.replace(/」/g, ')');

    s = s.replace(/《》/g, '(');
    s = s.replace(/\]/g, ')');

    s = s.replace(/{/g, '(');
    s = s.replace(/}/g, ')');

    s = s.replace(/｛/g, '(');
    s = s.replace(/｝/g, ')');

    s = s.replace(/〔/g, '(');
    s = s.replace(/〕/g, ')');
    return s;
}

function touchGoukei() {
    let a = goukei.value;
    return a + 1;
}
const keisanAnswer = computed(() => {
    if (!keisanki.value) {
        return;
    }

    try {
        touchGoukei();
        return "= " + eval(formatForEval(keisanki.value));
    } catch (error) {
        console.error(error);
        return "計算式が不正です";
    }
});
</script>

<template>
    <div>
        <input v-model="keisanki" placeholder="簡易計算機　例：合計 - 100" @change="emits('keisanChanged', keisanki)" />
    </div>
    <div class="keisanKekka">
        {{ keisanAnswer }}
    </div>
</template>

<style>
.keisanKekka {
    padding-top: 3px;
    font-family: serif;
}
</style>
