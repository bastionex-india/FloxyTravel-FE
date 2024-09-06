import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Editor({ onChange, editorLoaded, name, value }) {
  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          name={name}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;

// import React, { useEffect, useState } from "react";

// function Editor({ onChange, editorLoaded, name, value }) {
//   const [editorInstance, setEditorInstance] = useState({
//     CKEditor: null,
//     ClassicEditor: null,
//   });

//   useEffect(() => {
//     const loadEditor = async () => {
//       const { CKEditor } = await import("@ckeditor/ckeditor5-react");
//       const ClassicEditor = await import("@ckeditor/ckeditor5-build-classic");
//       setEditorInstance({ CKEditor, ClassicEditor });
//     };
//     loadEditor();
//   }, []);

//   const { CKEditor, ClassicEditor } = editorInstance;
//   console.log(
//     "editorLoaded && CKEditor && ClassicEditor",
//     editorLoaded,
//     "CKEditor",
//     CKEditor,
//     "ClassicEditor123 ",
//     ClassicEditor
//   );

//   return (
//     <div>
//       {editorLoaded && CKEditor && ClassicEditor ? (
//         <CKEditor
//           type=""
//           name={name}
//           editor={ClassicEditor}
//           config={{
//             ckfinder: {
//               uploadUrl: "", // Enter your upload URL
//             },
//           }}
//           data={value}
//           onChange={(event, editor) => {
//             const data = editor.getData();
//             onChange(data);
//           }}
//         />
//       ) : (
//         <div>Editor loading</div>
//       )}
//     </div>
//   );
// }

// export default Editor;
