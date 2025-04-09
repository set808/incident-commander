export interface Choice {
    label: string;
    nextId: string;
    command?: string;
}

export interface Scene {
    text: string;
    image?: string | null;
    logs?: string[];
    choices: Choice[];
}

export interface Adventure {
    title: string;
    description: string;
    start: string;
    scenes: Record<string, Scene>;
}
