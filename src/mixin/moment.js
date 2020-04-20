import moment from 'moment'
export default {
  methods: {
    moment(date, format) {
      return moment(date).format(format)
    }
  }
}