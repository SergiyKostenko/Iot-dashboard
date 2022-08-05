import {ApplicationInsights} from '@microsoft/applicationinsights-web'
import {
  ReactPlugin,
  withAITracking,
} from '@microsoft/applicationinsights-react-js'
import {globalHistory} from '@reach/router'

const reactPlugin = new ReactPlugin()
const ai = new ApplicationInsights({
  config: {
    instrumentationKey: "04d3342f-5ccd-4cc1-8360-43f9d9cbbc12",
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: {history: globalHistory},
    },
  },
})
ai.loadAppInsights()

ReactPlugin.prototype.trackEvent = function(event, customProperties) {
  this._analyticsPlugin.trackEvent(event, customProperties)
}

export default Component => withAITracking(reactPlugin, Component)
export const appInsights = ai.appInsights
export {reactPlugin}