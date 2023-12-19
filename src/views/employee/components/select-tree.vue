<template>
  <!-- element-ui 级联组件 -->
  <el-cascader
    size="mini"
    :options="treeData"
  />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      treeData: [], // 赋值给级联组件的options
      props: {
        label: 'name', // 要展示的字段
        value: 'id' // 要储存的字段
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      this.treeData = transListToTreeData(await getDepartment(), 0)
    }
  }
}
</script>

<style>

</style>
