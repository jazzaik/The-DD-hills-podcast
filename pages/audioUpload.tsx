import React, { useState } from "react"
import Router from "next/router";
import Uppy from "@uppy/core"
import { DragDrop } from "@uppy/react"
import XHRUpload from "@uppy/xhr-upload"


const uppy = Uppy({
  meta: { type: "podcastAudio" },
  restrictions: {
    maxNumberOfFiles: 1,
    maxFileSize: 1048576 * 12,
    allowedFileTypes: [".mp3"],
  },
  autoProceed: true,
})

uppy.use(XHRUpload, {
  endpoint: "/api/uploadAudio",
  fieldName: "podAudio",
  formData: true,
})

// uppy.use(ThumbnailGenerator, {
//   thumbnailWidth: 200,
//   waitForThumbnailsBeforeUpload: false,
// })

// uppy.on("thumbnail:generated", (file, preview) => {
//   console.log(file.name, preview)
// })

/*

    From:   https://uppy.io/examples/dashboard/
            https://uppy.io/docs/react/

 */

const ImageUpload = () => {
  const [title, setTitle] = useState("")
  const [filename, setFilename] = useState("somebody.mp3")

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, filename };
      await fetch(`http://localhost:3000/api/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  uppy.on("complete", result => {
    const url = result.successful[0].uploadURL
    console.log("successful upload", result)
  })
  
  uppy.on("error", error => {
    console.error(error.stack)
  })
  
  uppy.on("restriction-failed", (file, error) => {
    const err = error.stack.includes("exceeds maximum allowed size of 12 MB")
      ? "exceeds maximum allowed size of 12 MB"
      : error
  
    alert(
      "Feltöltési hiba: " +
        err +
        "\n" +
        file.name +
        " Filesize : " +
        Math.round(file.size / 1024 / 1024) +
        "MB"
    )
  })

  return (
    <div>
      <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
      <DragDrop
        uppy={uppy}
        locale={{
          strings: {
            // Text to show on the droppable area.
            // `%{browse}` is replaced with a link that opens the system file selection dialog.
            dropHereOr: "Drop File Here",
            // Used as the label for the link that opens the system file selection dialog.
            browse: "Browse Someting",
          },
        }}
      />
    </div>
  )
}

export default ImageUpload