<script lang="ts">
  import { onMount } from 'svelte';
  import { EditorView } from '@codemirror/view';
  import { codeMirrorSetup } from '../FloatingTaskInput/CodeMirrorConfig';
  import { Compartment, EditorState } from '@codemirror/state';
  const theme = new Compartment();
  import { oneDark } from '@codemirror/theme-one-dark';
  import { basicLight } from 'cm6-theme-basic-light';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import { markdown } from '@codemirror/lang-markdown';
  import { modeCurrent } from '@skeletonlabs/skeleton';
  import { keymap } from '@codemirror/view';
  let editor: HTMLDivElement;
  let view: EditorView;
  export let description: string;
  export let readonly: boolean = false;
  const saveKeyMap = [
    {
      key: 'Mod-s',
      run() {
        console.log(view.state.doc.toString());
        dispatch('save', { text: view.state.doc.toString() });
        return true;
      }
    }
  ];

  onMount(() => {
    view = new EditorView({
      doc: description,
      extensions: [
        codeMirrorSetup,
        EditorState.readOnly.of(readonly),
        theme.of(oneDark),
        markdown(),
        keymap.of(saveKeyMap)
      ],
      parent: editor
    });
    view.contentDOM.addEventListener('blur', (event) => {
      dispatch('lostFocus', { text: view.state.doc.toString() });
    });

    return () => {
      view.destroy();
    };
  });
  $: {
    view?.dispatch({
      effects: theme.reconfigure($modeCurrent ? basicLight : oneDark)
    });
  }
  export function reset() {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.toString().length, insert: '' }
    });
  }
  export function getContent() {
    return view.state.doc.toString();
  }
</script>

<div
  class="min-h-[10rem] max-h-30 rounded-container-token overflow-y-scroll py-1 px-2"
  bind:this={editor}
/>
