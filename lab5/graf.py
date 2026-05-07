import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import linkage, dendrogram

# Дані з таблиці: Маса, Ціна, Макс. швидкість, Споживання палива, Безпека
data = np.array([
    [5, 2, 7, 4, 4],    # Марка 1
    [4, 1, 4, 3, 3],    # Марка 2
    [5, 1, 6, 4, 4],    # Марка 3
    [6, 7, 9, 6, 8],    # Марка 4
    [6, 7, 10, 6, 8],   # Марка 5
    [9, 8, 5, 7, 2],    # Марка 6
    [10, 10, 3, 10, 3]  # Марка 7
])

labels = [
    "M1", "M2", "M3", "M4", "M5", "M6", "M7"
]

# Алгоритми кластеризації, крім Median
methods = {
    "Single linkage": "single",
    "Complete linkage": "complete",
    "Average linkage (unweighted)": "average",
    "Average linkage (weighted)": "weighted",
    "Centroid": "centroid",
    "Ward": "ward"
}

# Побудова дендрограм
for title, method in methods.items():
    Z = linkage(data, method=method, metric="euclidean")

    plt.figure(figsize=(8, 5))
    dendrogram(
        Z,
        labels=labels,
        leaf_font_size=12
    )

    plt.title(f"Дендрограма: {title}")
    plt.xlabel("Марки автомобілів")
    plt.ylabel("Евклідова відстань")
    plt.grid(True, linestyle="--", alpha=0.5)

    filename = title.replace(" ", "_").replace("(", "").replace(")", "") + ".png"
    plt.savefig(filename, dpi=300, bbox_inches="tight")
    plt.show()