<script setup>
import { ref, computed, watch, onMounted, nextTick, toRefs } from "vue";
import { zenkaku2Hankaku } from '@/utils';

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
    if (s.indexOf("=") >= 0 ||
        s.indexOf("'") >= 0 ||
        s.indexOf('"') >= 0 ||
        s.indexOf('`') >= 0) {
        return { result: "", error: "不正な文字が含まれています" };
    }

    if (/[a-zA-Z]/.test(s)) {
        return { result: "", error: "アルファベットは使えません" };
    }

    s = s.replace(/合計/g, 'goukei.value');
    s = zenkaku2Hankaku(s);

    s = s.replace(/÷/g, '/');
    s = s.replace(/×/g, '*');
    s = s.replace(/＋/g, '+');
    s = s.replace(/－/g, '-');
    s = s.replace(/ー/g, '-');
    s = s.replace(/⁻/g, '-');
    s = s.replace(/％/g, '%');

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

    return { result: s, error: "" };
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
        let ret = formatForEval(keisanki.value);
        if (ret.error) {
            return ret.error;
        }
        return "= " + eval(ret.result);
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
