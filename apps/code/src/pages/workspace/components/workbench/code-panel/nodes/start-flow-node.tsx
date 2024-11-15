import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function StartFlowNode({ data }) {
    return (
        <div className="flex justify-center items-center border-2 border-primary w-20 h-8 rounded text-sm bg-card">
            <span>{data.label}</span>
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-16 !bg-blue-500"
            />
        </div>
    );
}

export default memo(StartFlowNode);