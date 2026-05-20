import { Handle, Position, useReactFlow } from '@xyflow/react';
import { getGateStyle } from '../../gateStyles';

const GateNode = ({ id, data }) => {
    const { setNodes, setEdges } = useReactFlow();

    const isUnary = data.label === 'NOT';
    const { color } = getGateStyle(data.label);

    const handleDelete = (event) => {
        event.stopPropagation();
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
    };

    const handleStyle = {
        background: '#94a3b8',
        width: '10px',
        height: '10px',
        left: '-5px'
    };

    return (
        <div style={{
            position: 'relative',
            padding: '15px',
            borderRadius: '12px',
            background: '#1e293b',
            border: `2px solid ${color}`,
            width: '100px',
            textAlign: 'center',
            color,
            boxShadow: `0 0 16px ${color}33, 0 4px 6px -1px rgba(0, 0, 0, 0.5)`,
            transition: 'border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease'
        }}>

            <button
                onClick={handleDelete}
                style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    color: '#ffffff',
                    border: '2px solid #1e293b',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
                    zIndex: 10,
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#dc2626';
                    e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ef4444';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
                title="Șterge poarta"
            >
                ×
            </button>

            {isUnary ? (
                <Handle type="target" position={Position.Left} id="a" style={handleStyle} />
            ) : (
                <>
                    <Handle type="target" position={Position.Left} id="a" style={{ ...handleStyle, top: '30%' }} />
                    <Handle type="target" position={Position.Left} id="b" style={{ ...handleStyle, top: '70%' }} />
                </>
            )}

            <div style={{ fontWeight: '900', fontSize: '20px', letterSpacing: '2px' }}>
                {data.label}
            </div>

            <Handle
                type="source"
                position={Position.Right}
                id="output"
                style={{
                    background: '#f8fafc',
                    width: '12px',
                    height: '12px',
                    right: '-6px'
                }}
            />
        </div>
    );
};

export default GateNode;