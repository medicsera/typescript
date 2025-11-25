type DeepReadOnly<T> = 
    T extends (infer R)[] ? readonly DeepReadOnly<R>[] :
    T extends Function ? T :
    T extends object ? { readonly [K in keyof T]: DeepReadOnly<T[K]> }:
    T;

function deepFreeze<T>(obj: T): DeepReadOnly<T> {
    if (obj === null || typeof obj !== "object") {
        return obj as DeepReadOnly<T>;
    }
    
    if (Object.isFrozen(obj)) {
        return obj as DeepReadOnly<T>;
    }

    Object.getOwnPropertyNames(obj).forEach((prop) => {
        const value = (obj as any)[prop]
        
        if (value !== null && typeof value === "object" && !Object.isFrozen(value)){
            deepFreeze(value)
        } 
    });
    return Object.freeze(obj) as DeepReadOnly<T>;
}

type NestedData = {
  name: string;
  config: {
    theme: string;
    features: {
      darkMode: boolean;
      beta: boolean;
    };
  };
  tags: string[];
};

const data: NestedData = {
  name: "MyApp",
  config: {
    theme: "light",
    features: {
      darkMode: false,
      beta: true
    }
  },
  tags: ["web", "vue", "scss"],
};

const frozenData = deepFreeze(data);

try {
  (frozenData.config as any).theme = "dark"; 
} catch (e) {
  console.log("Объект заморожен!");
}

console.log(frozenData);

