import { defineComponent, PropType, VNode } from "vue";
import { Text } from "@darwin-studio/vue-ui/src/types/text";
import config from "./config";
import styles from "./index.css?module";

/**
 * A clickable component which renders as <b>button</b> element, <b>router-link</b> component or <b>a</b> element depending on props.
 */
export default defineComponent({
  name: config.name,

  props: {
    // TODO: headers
    headers: {
      type: Array as PropType<Text[] | VNode[]>,
    },
    headerClass: {
      type: String,
    },
    // TODO: items

    // TODO: headClassName
    // TODO: bodyClassName
  },

  computed: {
    renderHead(): VNode {
      // TODO: enableHtml
      return (
        <thead>
          {/*TODO: what if 2 level of headers with colspan*/}
          <tr>
            {/* TODO: slot | enableHtml*/}
            {this.headers?.map((header) => (
              /*TODO: aria*/
              <th role="columnheader" scope="col" aria-label="TODO">
                {header}
              </th>
            ))}
          </tr>
        </thead>
      );
    },
  },

  render(): VNode {
    return (
      <table class={styles[config.className]}>
        {this.renderHead}
        <tbody>TODO: tbody</tbody>
      </table>
    );
  },
});
