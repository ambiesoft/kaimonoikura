<script setup>
import { ref, computed, watch, onMounted, nextTick, toRefs } from "vue";
import { zenkaku2Hankaku } from '@/utils';

const props = defineProps([
    'keisanki',
    'goukei',
    'syoukei',
    'zeigaku',
]);
const keisanki = ref(props.keisanki);
const goukei = ref(props.goukei);
const syoukei = ref(props.syoukei);
const zeigaku = ref(props.zeigaku);

const emits = defineEmits([
    'keisanChanged',
    'keisanInputted',
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

    s = s.replace(/合計/g, "(" + goukei.value + ")");
    s = s.replace(/小計/g, "(" + syoukei.value + ")");
    s = s.replace(/税額/g, "(" + zeigaku.value + ")");
    s = s.replace(/切上/g, " Math.ceil ");
    s = s.replace(/四捨五入/g, " Math.round ");
    s = s.replace(/切下/g, " Math.floor ");

    s = zenkaku2Hankaku(s);

    s = s.replace(/÷/g, '/');
    s = s.replace(/×/g, '*');
    s = s.replace(/＋/g, '+');
    s = s.replace(/－/g, '-');
    s = s.replace(/ー/g, '-');
    s = s.replace(/⁻/g, '-');
    s = s.replace(/％/g, '%');
    s = s.replace(/＊/g, '*');

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

    s = s.replace(/（/g, '(');
    s = s.replace(/）/g, ')');

    return { result: s, error: "" };
}

const keisanError = ref();
const keisanAnswer = computed(() => {
    keisanError.value = "";
    if (!keisanki.value) {
        return;
    }
    const nazo = "?";
    try {
        let formatted = formatForEval(keisanki.value);
        if (formatted.error) {
            keisanError.value = formatted.error;
            return nazo;
        }
        // console.log("計算式", formatted.result);
        return new Function('return ' + formatted.result)();
    } catch (err) {
        console.error(err);
        keisanError.value = "計算式が不正です";
        return nazo;
    }
});

const selectedSpecialInput = ref();

const SPECIAL_SELECTIONS = [
    {
        id: "label",
        name: "特殊値入力",
        enabled: false,
    },
    {
        id: "goukei",
        name: "合計",
        enabled: true,
    },
    {
        id: "syoukei",
        name: "小計",
        enabled: true,
    },
    {
        id: "zeigaku",
        name: "税額",
        enabled: true,
    },
    {
        id: "kiriage",
        name: "切上",
        enabled: true,
        isfunc: true,
    },
    {
        id: "sisyagonyuu",
        name: "四捨五入",
        enabled: true,
        isfunc: true,
    },
    {
        id: "kirisage",
        name: "切下",
        enabled: true,
        isfunc: true,
    },
    {
        id: "label",
        name: "-------------",
        enabled: false,
    },
    {
        id: "clear",
        name: "クリア",
        enabled: true,
    },
];

// Initial Selection
selectedSpecialInput.value = SPECIAL_SELECTIONS[0];

watch(selectedSpecialInput, (newItems) => {
    // newItems is one of SPECIAL_SELECTIONS

    // Reset the option list after this function
    nextTick(() => {
        selectedSpecialInput.value = SPECIAL_SELECTIONS[0];
    });

    if (newItems.id == "label")
        return;
    if (newItems.id == "clear") {
        keisanki.value = "";
        return;
    }
    keisanki.value += newItems.name;
    if (newItems.isfunc) {
        keisanki.value += "(123.45)";
    }
})

</script>

<template>
    <div class="calccontainer">
        <select id="aaa" class="nnnn" v-model="selectedSpecialInput">
            <option v-for="sp in SPECIAL_SELECTIONS" :key="sp" :value="sp" :disabled="!sp.enabled">{{ sp.name }}
            </option>
        </select>

        <input v-model="keisanki" class="kesankiInput" placeholder="簡易計算機　例：合計 - 100"
            @change="emits('keisanChanged', keisanki)" @input="emits('keisanInputted', keisanki)" />
        <div class="keisanKekka">
            ={{ keisanAnswer }}
        </div>
    </div>
    <div class="keisanError">
        {{ keisanError }}
    </div>
</template>

<style>
.calccontainer {
    display: flex;
    justify-content: center;
    align-items: center;
}

.kesankiInput {
    text-align: right;
}

.keisanKekka {
    padding-top: 3px;
    padding-left: 3px;
}

.keisanError {
    color: red;
    text-align: center;
}
</style>
