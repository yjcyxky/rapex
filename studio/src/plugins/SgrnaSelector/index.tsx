import React, { useEffect, useState } from 'react'
import { GuideScoperViewer } from 'biominer-components';

type SgrnaSelectorProps = {
  rootId?: string,
  // Only support entrezId for now
  geneId: number,
  // Only support 9606(human), 10090(mouse) for now
  taxId?: number
}

const SgrnaSelector: React.FC<SgrnaSelectorProps> = (props) => {
  const [rootId, setRootId] = useState<string>("");

  useEffect(() => {
    if (!props.rootId) {
      setRootId('grna-selector')
    } else {
      setRootId(props.rootId)
    }
  }, []);

  return (
    <GuideScoperViewer geneId={`${props.geneId}`} id={rootId}></GuideScoperViewer>
  )
}

export default SgrnaSelector;