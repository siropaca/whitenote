import Vue from 'vue'
import DocumentOutliner from 'document-outliner'

Vue.prototype.$documentOutliner = (className) => {
  return new DocumentOutliner(className)
}
