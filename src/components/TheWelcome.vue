<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="w-75 d-flex flex-column ">
      <div>
        <h1 class="rainbow-text d-inline-block fw-bold display-1">Elpris</h1>
      </div>
      <p class="lead">Jämför dagens pris med föregående år</p>
      <Transition appear>
        <div class="card">
          <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th v-for="header in elpris.headers" :key="header.text" :class="header.classes" scope="col">{{ header.text }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in elpris.rows" :key="row.time">
                    <th scope="row">{{ row.time }}</th>
                    <td class="font-monospace text-end">{{ row.lastYearPrice }}</td>
                    <td class="font-monospace text-end">{{ row.currentYearPrice }}</td>
                    <td class="text-end" :class="row.cssClass" @click="row.clickHandler(row.diff > 0)">{{ row.icon }} {{ row.diff }}</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
    </Transition>
    </div>
  </div>
</template> 

<script setup lang="ts">
import { BackendRepository } from "@/api/backend-repository";
import { ref, defineProps } from "vue";

interface TableRowData { time: string, lastYearPrice: number, currentYearPrice: number, diff: number, icon: string, cssClass: string, clickHandler: (angry: boolean) => void }

interface TabelRowHeader {
  text: string;
  classes: string[];
};

interface TableData {
  headers: TabelRowHeader[];
  rows: TableRowData[]
}

defineProps({
  hello: {
    type: String,
    required: true,
  }
});

const elpris = ref<TableData>({
  headers: [],
  rows: []
});

const getHoursFromDate = (dateString: string) => {
  const date = new Date(dateString);
  return ("0" +  date.getHours()).slice(-2);
};

const loadElpris = (year: number) => {
  return BackendRepository.getElPris(year).then((response) => {
    return response;
  });
};

const calcDiff = (a: number, b: number): number => {
  return Number((a - b).toFixed(2));
}

const onClick = async (angry: boolean) => {

  if (angry) {
    const { fact } = await BackendRepository.getCatFact()
    alert(fact);
  } else {
    const response = await BackendRepository.getDogFact()
    alert(response.data[0]?.attributes.body ?? 'No data :)');
  }
}

const loadData = () => {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  Promise.all([loadElpris(currentYear), loadElpris(lastYear)]).then((response) => {
    const [currentYearData, lastYearData ] = response;
    
    const rows = currentYearData.reduce<TableRowData[]>((prev, current, index) => {
      const currentYearPrice = current.SEK_per_kWh;
      const lastYearPrice = lastYearData[index].SEK_per_kWh
      const diff = calcDiff(currentYearPrice, lastYearPrice);
      const icon = diff < 0 ? '😀' : '🤬';
      const cssClass = diff < 0 ? 'text-success' : 'text-danger';


      prev.push({
        time: getHoursFromDate(current.time_start),
        currentYearPrice,
        lastYearPrice,
        diff,
        icon,
        cssClass,
        clickHandler: onClick
      });

      return prev;

    }, []);

    elpris.value = {
      headers: [
        { text: 'Tid', classes: []},
        { text: 'Föregående år', classes: ['text-end']},
        { text: 'Idag', classes: ['text-end']},
        { text: 'Skillnad', classes: ['text-end']}
      ],
      rows,
    };
  });

};

loadData();

</script>
