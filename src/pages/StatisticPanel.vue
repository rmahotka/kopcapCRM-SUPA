<template>
  <div class="p-3 bg-white m-4 rounded-xl">
    <div class="flex justify-around">
      <div class="w-1/3">
        <h6 class="text-center font-bold mb-2">Статистика по заказам</h6>
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full" />
      </div>
      <div class="w-1/3">
        <h6 class="text-center font-bold mb-2">Статистика по клиентам</h6>
        <Chart type="pie" :data="chartDataCompany" :options="chartOptions" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/config/supabase'

const chartData = ref()
const chartOptions = ref(null)
const chartDataCompany = ref()
const company = ref([])
const companyArray = ref([])
const countOrder = ref({
  unprocessed: 0,
  confirmed: 0,
  coordinationRequier: 0,
  offer: 0,
  confirmationTransaction: 0,
  completedTransaction: 0,
  coordinateTechnicalSpecialist: 0,
  rejection: 0
})

const statusMap = {
  1: 'unprocessed',
  2: 'confirmed',
  3: 'coordinationRequier',
  4: 'offer',
  5: 'confirmationTransaction',
  6: 'completedTransaction',
  7: 'coordinateTechnicalSpecialist',
  8: 'rejection'
}

const getCompany = async () => {
  const { data, error } = await supabase.from('company').select('id, name')
  if (error) return Error

  company.value = data
}

const getProjects = async () => {
  const { data, error } = await supabase.from('order').select()
  if (error) return Error

  const countCompany = {}

  data.forEach((elem) => {
    const status = statusMap[elem.id_stage]
    countOrder.value[status] += 1
    const companyId = elem.id_company
    countCompany[companyId] = (countCompany[companyId] || 0) + 1
  })

  companyArray.value = company.value.map((companys) => {
    const { id, name } = companys
    const count = countCompany[id] || 0
    return { name, count }
  })
}

onMounted(async () => {
  await getCompany()
  await getProjects()
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
  chartDataCompany.value = setChartDataCompany()
})

const getStatusLabel = (key) => {
  const statusLabels = {
    unprocessed: 'Необработанная заявка',
    confirmed: 'Запрос подтвержден',
    coordinationRequier: 'Согласование всех требований',
    offer: 'Предложить коммерческое предложение',
    confirmationTransaction: 'Подтверждение сделки',
    completedTransaction: 'Выполненная сделка (подтверждение оплаты)',
    coordinateTechnicalSpecialist: 'Соглосовать проект с техническим специалистом',
    rejection: 'Отказ'
  }
  return statusLabels[key]
}

function darkenColor(color, amount) {
  const parsedColor = parseInt(color.slice(1), 16)
  const r = (parsedColor >> 16) - amount
  const g = ((parsedColor >> 8) & 0xff) - amount
  const b = (parsedColor & 0xff) - amount
  const newColor = ((r < 0 ? 0 : r) << 16) + ((g < 0 ? 0 : g) << 8) + (b < 0 ? 0 : b)
  return '#' + newColor.toString(16)
}

const setChartDataCompany = () => {
  const labels = []
  const data = []
  const backgroundColor = []
  const hoverBackgroundColor = []
  for (const { name, count } of companyArray.value) {
    labels.push(name)
    data.push(count)
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    backgroundColor.push(randomColor)
    const darkerColor = darkenColor(randomColor, 40)
    hoverBackgroundColor.push(darkerColor)
  }

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor
      }
    ]
  }
}

const setChartData = () => {
  const labels = []
  const data = []
  const backgroundColor = []
  const hoverBackgroundColor = []
  for (const [status, count] of Object.entries(countOrder.value)) {
    if (count > 0) {
      labels.push(getStatusLabel(status))
      data.push(count)
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
      backgroundColor.push(randomColor)
      const darkerColor = darkenColor(randomColor, 40)
      hoverBackgroundColor.push(darkerColor)
    }
  }

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor
      }
    ]
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor
        }
      }
    }
  }
}
</script>
