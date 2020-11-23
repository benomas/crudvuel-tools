import {split} from 'lodash'
export default {
  computed: {
    cSegment () {
      return 'row'
    }
  },

  methods: {
    emStaGenRowProccesor (emitted) {
      return new Promise((resolve, reject) => {
        this.mInyectSegment(emitted)
        resolve(emitted)
      })
    },

    mInyectSegment (assignment = {}) {
      let row = assignment.row != null ? assignment.row : null

      if (assignment.segment == null || assignment.segment === '*') {
        let fixedIndex = Object.keys(assignment.row)[0]
        if (fixedIndex === '*')
          row = assignment.row[fixedIndex]

        if (this[this.cSegment] == null)
          this.$set(this,this.cSegment,{})

        this[this.cSegment] = {...this[this.cSegment],...row}

        return
      }

      let segment   = assignment.segment
      let segments = split(assignment.segment,'.')

      if (segments.length === 1) {
        if (this[this.cSegment][segment] == null)
          this.$set(this[this.cSegment],segment,Array.isArray(row) ? [] : {})

        this[this.cSegment][segment] = this.mCvConditionalDestructuring(this[this.cSegment][segment],row)

        return this
      }

      return this.mDepthSegments(assignment,segments)
    },

    //Testing for confirm as definitive
    mDepthSegments (assignment,segments = []) {
      if (this[this.cSegment] == null)
        this.$set(this,this.cSegment,{})

      let oldRowRef    = this[this.cSegment]
      let segmentCount = 0
      let segment      = segments[segmentCount]

      while (!/^\d+$/g.test(segment) && segmentCount < segments.length) {
        if (oldRowRef[segment] == null) {
          if (segmentCount < segments.length - 1) {
            if (/^\d+$/g.test(segments[segmentCount + 1]))
              this.$set(oldRowRef,segment,[])
            else
              this.$set(oldRowRef,segment,{})
          } else
            this.$set(oldRowRef,segment,{})
        }

        oldRowRef = oldRowRef[segment]
        segment = segments[++segmentCount]
      }

      while (segmentCount < segments.length) {
        segment = segments[segmentCount]
        if (oldRowRef[segment] == null) {
          if (segmentCount < segments.length - 1) {
            if (/^\d+$/g.test(segments[segmentCount + 1]))
              this.$set(oldRowRef,segment,[])
            else
              this.$set(oldRowRef,segment,{})
          } else {
            this.$set(oldRowRef,segment,assignment.row)
          }
        } else {
          this.$set(oldRowRef,segment,assignment.row)
        }
        segmentCount++
      }

      return this
    },

    //To be deprecated
    mInyectSegmentOld (assignment = {}) {
      let row         = assignment.row != null ? assignment.row : null
      let selfSegment = this.cSegment
      if (assignment.segment == null || assignment.segment === '*') {
        let fixedIndex = Object.keys(assignment.row)[0]
        if (fixedIndex === '*')
          row = assignment.row[fixedIndex]
        this.$set(this,selfSegment,{...this[selfSegment],...row})
        return
      }
      let segment   = assignment.segment
      let oldrow = this[selfSegment][segment] != null ? this[selfSegment][segment] : {}
      this.$set(this[selfSegment],segment,{...oldrow,...row})
      return this
    }
  }
}
