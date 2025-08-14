<script lang="ts" setup>
// 使用统一后的 Accordion 组件 (Root=Accordion + Item/Trigger/Content)

const singleValue = ref<string | undefined>('intro')
const multiValue = ref<string[] | undefined>(['intro'])

const items = [
  { value: 'intro', title: '什么是 Moment Decorator?', content: '一个用于精致朋友圈内容展示的小工具集合。' },
  { value: 'multi', title: '支持多开吗?', content: 'Root 组件 type=multiple 支持多个同时展开。' },
  { value: 'style', title: '可否自定义样式?', content: '完全基于 UnoCSS 原子类，按需覆盖即可。' },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h3 class="text-sm font-semibold mb-2">
        Single (可折叠)
      </h3>
      <Accordion v-model="singleValue" type="single" collapsible>
        <AccordionItem v-for="it in items" :key="it.value" :value="it.value">
          <AccordionTrigger>{{ it.title }}</AccordionTrigger>
          <AccordionContent>{{ it.content }}</AccordionContent>
        </AccordionItem>
      </Accordion>
      <p class="text-xs mt-2 text-gray-500">
        当前值: {{ singleValue }}
      </p>
    </div>

    <div>
      <h3 class="text-sm font-semibold mb-2">
        Multiple
      </h3>
      <Accordion v-model="multiValue" type="multiple">
        <AccordionItem v-for="it in items" :key="it.value" :value="it.value">
          <AccordionTrigger>{{ it.title }}</AccordionTrigger>
          <AccordionContent>{{ it.content }}</AccordionContent>
        </AccordionItem>
      </Accordion>
      <p class="text-xs mt-2 text-gray-500">
        当前值: {{ multiValue }}
      </p>
    </div>
  </div>
</template>
