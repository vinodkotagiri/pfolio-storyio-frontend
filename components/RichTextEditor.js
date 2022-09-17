//u2wunzyouesbwb0anab2uduokac8q5xgmbe05mzhy5b92amd
import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
const RichTextEditor = ({ content, setContent }) => {
	const editorRef = useRef(null)

	// console.log(content)
	return (
		<>
			<Editor
				onEditorChange={(newValue, editor) => {
					setContent(newValue)
					localStorage.setItem('post-content', JSON.stringify(newValue))
				}}
				apiKey='u2wunzyouesbwb0anab2uduokac8q5xgmbe05mzhy5b92amd'
				onInit={(evt, editor) => (editorRef.current = editor)}
				value={content}
				init={{
					height: 500,
					menubar: false,
					plugins: [
						'advlist',
						'autolink',
						'lists',
						'link',
						'image',
						'charmap',
						'preview',
						'anchor',
						'searchreplace',
						'visualblocks',
						'code',
						'fullscreen',
						'insertdatetime',
						'media',
						'table',
						'code',
						'help',
						'wordcount',
					],
					toolbar:
						'undo redo | blocks | ' +
						'bold italic forecolor | alignleft aligncenter ' +
						'alignright alignjustify image media| bullist numlist outdent indent  |  ' +
						'removeformat | help',
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				}}
			/>
		</>
	)
}

export default RichTextEditor
