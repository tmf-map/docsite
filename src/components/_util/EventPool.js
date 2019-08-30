class EventPool {
  constructor () {
    this.pool = []
  }

  add (event) {
    if (typeof event === 'function') {
      this.pool.push(event)
    }
  }

  free () {
    const len = this.pool.length
    for (let i = 0; i < len; i++) {
      this.pool[i]()
    }
    this.pool.length = 0
  }
}

export default EventPool
