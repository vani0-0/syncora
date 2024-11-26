import cluster from 'node:cluster'
import { availableParallelism } from 'node:os'
import { PrimaryProcess, WorkerProcess } from '@/core/workers'

function main() {
  const cpuCount = 1

  if (cluster.isPrimary) {
    PrimaryProcess(cpuCount, cluster)
  }
  else {
    WorkerProcess(cpuCount)
  }
}

main()
