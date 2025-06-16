export interface Choice {
    label: string;
    nextId: string;
    command?: string;
}

type SceneChart = {
    type: 'braille' | 'bar' | 'line';
    data: number[];
}

export interface Scene {
    text: string;
    image?: string | null;
    logs?: string[];
    chart?: SceneChart;
    choices: Choice[];
}

export interface Adventure {
    title: string;
    description: string;
    start: string;
    scenes: Record<string, Scene>;
}
