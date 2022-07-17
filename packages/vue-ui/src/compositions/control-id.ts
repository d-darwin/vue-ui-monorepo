import { Ref, ref, watchEffect } from "vue";
import { v4 as uuid } from "uuid";
import type { Text } from "@/types/text";

/**
 * Uses passed id prop or generates custom UUID.
 * See example usage in '@dariwn-studio/vue-ui/components/atoms/d-input'.
 *
 * @param props
 * @returns {{controlId: Text}}
 */
export default function useControlId(props: { id?: Text }): {
  controlId: Ref<string>;
} {
  const controlId = ref(String(props.id) || uuid());

  watchEffect(() => {
    controlId.value = String(props.id) || uuid();
  });

  return { controlId };
}
