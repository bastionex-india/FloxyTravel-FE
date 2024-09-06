import React, { useEffect, useRef } from "react";

function Editor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          config={{
            ckfinder: {
              // Upload the images to the server using the CKFinder QuickUpload command
              // You have to change this address to your server that has the ckfinder php connector
              uploadUrl: "" //Enter your upload url
            }
          }}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
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
