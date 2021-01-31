<template>
  <div id="prompt">
    <table>
      <thead>
        <tr>
          <th>列车号</th>
          <th>出发点</th>
          <th>终点</th>
          <th>出发时间</th>
          <th>到达时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trainData in trainDatas" :key="trainData.train_no">
          <td>{{ trainData.train_no }}</td>
          <td>{{ trainData.train_begin }}</td>
          <td>{{ trainData.train_end }}</td>
          <td>{{ trainData.time_begin }}</td>
          <td>{{ trainData.time_end }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    props: ['trainDatas'],
    data() {
      return {
      }
    },
}
</script>

<style>
#prompt {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 20px;
  z-index: 1;
}
th {
  width: 95px;
}
</style>