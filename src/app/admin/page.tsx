"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Save, LogOut, Plus, Trash2, Clock, Tag, MessageSquare, BookOpen, Globe 
} from "lucide-react";
import { menuData } from "@/data/menu";

type Lang = "pt" | "en" | "fr";
type AdminTab = "general" | "menu" | "promotions" | "reviews";

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("general");
  const [selectedLang, setSelectedLang] = useState<Lang>("pt");
  const [data, setData] = useState<typeof menuData | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Security Check & Data Initialization
  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
      
      // Load custom menu data if exists, otherwise load static menuData
      const localData = localStorage.getItem("custom-menu-data");
      if (localData) {
        try {
          setData(JSON.parse(localData));
        } catch (e) {
          setData(menuData);
        }
      } else {
        setData(menuData);
      }
    }
  }, [router]);

  if (!authorized || !data) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    router.push("/login");
  };

  const handleSave = () => {
    localStorage.setItem("custom-menu-data", JSON.stringify(data));
    setSaveStatus("Cambios guardados con éxito!");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Helper helpers to edit nested values safely
  const updateGeneralText = (key: "schedule1" | "schedule2" | "directions" | "desc", value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [selectedLang]: {
          ...prev[selectedLang],
          location: {
            ...prev[selectedLang].location,
            [key]: value
          }
        }
      };
    });
  };

  const updatePromotionItem = (index: number, key: "title" | "desc" | "badge", value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const updatedItems = [...prev[selectedLang].promotions.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [key]: value
      };
      return {
        ...prev,
        [selectedLang]: {
          ...prev[selectedLang],
          promotions: {
            ...prev[selectedLang].promotions,
            items: updatedItems
          }
        }
      };
    });
  };

  const addReview = () => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [selectedLang]: {
          ...prev[selectedLang],
          reviews: [...prev[selectedLang].reviews, { text: "Nueva reseña", author: "Cliente" }]
        }
      };
    });
  };

  const deleteReview = (index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [selectedLang]: {
          ...prev[selectedLang],
          reviews: prev[selectedLang].reviews.filter((_, i) => i !== index)
        }
      };
    });
  };

  const updateReview = (index: number, key: "text" | "author", value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const updatedReviews = [...prev[selectedLang].reviews];
      updatedReviews[index] = {
        ...updatedReviews[index],
        [key]: value
      };
      return {
        ...prev,
        [selectedLang]: {
          ...prev[selectedLang],
          reviews: updatedReviews
        }
      };
    });
  };

  // Menu lists helpers (Nachos, Drinks, Desserts etc.)
  const updateMenuItem = (category: "nachos" | "drinks" | "desserts", listType: "items" | "starters" | "beers", index: number, key: "name" | "price", value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const categoryData = prev[selectedLang][category];
      const listToUpdate = [...(categoryData[listType] as any)];
      listToUpdate[index] = {
        ...listToUpdate[index],
        [key]: value
      };
      return {
        ...prev,
        [selectedLang]: {
          ...prev[selectedLang],
          [category]: {
            ...categoryData,
            [listType]: listToUpdate
          }
        }
      };
    });
  };

  const addMenuItem = (category: "nachos" | "drinks" | "desserts", listType: "items" | "starters" | "beers") => {
    setData((prev) => {
      if (!prev) return prev;
      const categoryData = prev[selectedLang][category];
      const listToUpdate = [...(categoryData[listType] as any), { name: "Nuevo Ítem", price: "0.00€" }];
      return {
        ...prev,
        [selectedLang]: {
          ...prev[selectedLang],
          [category]: {
            ...categoryData,
            [listType]: listToUpdate
          }
        }
      };
    });
  };

  const deleteMenuItem = (category: "nachos" | "drinks" | "desserts", listType: "items" | "starters" | "beers", index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      const categoryData = prev[selectedLang][category];
      const listToUpdate = (categoryData[listType] as any).filter((_: any, i: number) => i !== index);
      return {
        ...prev,
        [selectedLang]: {
          ...prev[selectedLang],
          [category]: {
            ...categoryData,
            [listType]: listToUpdate
          }
        }
      };
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col selection:bg-lime-500 selection:text-black">
      
      {/* Header */}
      <header className="border-b border-white/10 bg-neutral-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
          <div>
            <h1 className="font-extrabold text-lg tracking-tight">Aguacate Dashboard</h1>
            <span className="text-xs text-neutral-400">Administración general</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex gap-1 bg-neutral-950 p-1 rounded-full border border-white/10 text-xs">
            {(["pt", "en", "fr"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLang(l)}
                className={`px-3 py-1.5 rounded-full font-bold uppercase transition-all ${selectedLang === l ? "bg-lime-500 text-black" : "text-neutral-400 hover:text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>

          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-lime-500 text-black font-bold rounded-full text-sm hover:bg-lime-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(132,204,22,0.3)]"
          >
            <Save className="w-4 h-4" /> Guardar Cambios
          </button>
          
          <button 
            onClick={handleLogout}
            className="p-2 border border-neutral-800 rounded-full hover:border-red-500 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Admin layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="md:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 font-semibold transition-all ${activeTab === "general" ? "bg-lime-500 text-black shadow-lg" : "bg-neutral-900/40 hover:bg-neutral-900 border border-white/5"}`}
          >
            <Clock className="w-5 h-5" /> General y Horarios
          </button>
          <button
            onClick={() => setActiveTab("menu")}
            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 font-semibold transition-all ${activeTab === "menu" ? "bg-lime-500 text-black shadow-lg" : "bg-neutral-900/40 hover:bg-neutral-900 border border-white/5"}`}
          >
            <BookOpen className="w-5 h-5" /> Carta del Menú
          </button>
          <button
            onClick={() => setActiveTab("promotions")}
            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 font-semibold transition-all ${activeTab === "promotions" ? "bg-lime-500 text-black shadow-lg" : "bg-neutral-900/40 hover:bg-neutral-900 border border-white/5"}`}
          >
            <Tag className="w-5 h-5" /> Promociones
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 font-semibold transition-all ${activeTab === "reviews" ? "bg-lime-500 text-black shadow-lg" : "bg-neutral-900/40 hover:bg-neutral-900 border border-white/5"}`}
          >
            <MessageSquare className="w-5 h-5" /> Reseñas
          </button>

          {saveStatus && (
            <div className="mt-8 bg-lime-500/10 border border-lime-500/20 text-lime-400 text-sm px-4 py-3 rounded-2xl text-center">
              {saveStatus}
            </div>
          )}
        </aside>

        {/* Content Area */}
        <main className="md:col-span-3 bg-neutral-900/30 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-sm relative">
          
          {/* General and Location Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-3 flex items-center gap-2 text-lime-400">
                <Clock className="w-6 h-6" /> Información General ({selectedLang.toUpperCase()})
              </h2>

              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-300 mb-2">
                    Horario: Domingo a Jueves
                  </label>
                  <input
                    type="text"
                    value={data[selectedLang].location.schedule1}
                    onChange={(e) => updateGeneralText("schedule1", e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-300 mb-2">
                    Horario: Viernes y Sábado
                  </label>
                  <input
                    type="text"
                    value={data[selectedLang].location.schedule2}
                    onChange={(e) => updateGeneralText("schedule2", e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-300 mb-2">
                    Texto del botón para direcciones (Cómo llegar)
                  </label>
                  <input
                    type="text"
                    value={data[selectedLang].location.directions}
                    onChange={(e) => updateGeneralText("directions", e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-300 mb-2">
                    Descripción sobre nosotros
                  </label>
                  <textarea
                    rows={4}
                    value={data[selectedLang].location.desc}
                    onChange={(e) => updateGeneralText("desc", e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Menu Items Editor */}
          {activeTab === "menu" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-3 flex items-center gap-2 text-lime-400">
                <BookOpen className="w-6 h-6" /> Gestión de la Carta ({selectedLang.toUpperCase()})
              </h2>

              {/* Nachos & Entradas */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-neutral-300">Nachos</h3>
                  <button 
                    onClick={() => addMenuItem("nachos", "items")}
                    className="px-3 py-1 bg-lime-500/10 hover:bg-lime-500 hover:text-black transition-colors rounded-lg text-lime-400 font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Añadir Entrada
                  </button>
                </div>
                <div className="space-y-3">
                  {data[selectedLang].nachos.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-neutral-950 p-3 rounded-xl border border-white/5">
                      <input 
                        type="text" 
                        value={item.name} 
                        onChange={(e) => updateMenuItem("nachos", "items", idx, "name", e.target.value)}
                        className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white"
                      />
                      <input 
                        type="text" 
                        value={item.price} 
                        onChange={(e) => updateMenuItem("nachos", "items", idx, "price", e.target.value)}
                        className="w-24 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-lime-400 text-center"
                      />
                      <button 
                        onClick={() => deleteMenuItem("nachos", "items", idx)}
                        className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bebidas */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-neutral-300">Bebidas</h3>
                  <button 
                    onClick={() => addMenuItem("drinks", "items")}
                    className="px-3 py-1 bg-lime-500/10 hover:bg-lime-500 hover:text-black transition-colors rounded-lg text-lime-400 font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Añadir Bebida
                  </button>
                </div>
                <div className="space-y-3">
                  {data[selectedLang].drinks.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-neutral-950 p-3 rounded-xl border border-white/5">
                      <input 
                        type="text" 
                        value={item.name} 
                        onChange={(e) => updateMenuItem("drinks", "items", idx, "name", e.target.value)}
                        className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white"
                      />
                      <input 
                        type="text" 
                        value={item.price} 
                        onChange={(e) => updateMenuItem("drinks", "items", idx, "price", e.target.value)}
                        className="w-24 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-lime-400 text-center"
                      />
                      <button 
                        onClick={() => deleteMenuItem("drinks", "items", idx)}
                        className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Postres */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-neutral-300">Postres</h3>
                  <button 
                    onClick={() => addMenuItem("desserts", "items")}
                    className="px-3 py-1 bg-lime-500/10 hover:bg-lime-500 hover:text-black transition-colors rounded-lg text-lime-400 font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Añadir Postre
                  </button>
                </div>
                <div className="space-y-3">
                  {data[selectedLang].desserts.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-neutral-950 p-3 rounded-xl border border-white/5">
                      <input 
                        type="text" 
                        value={item.name} 
                        onChange={(e) => updateMenuItem("desserts", "items", idx, "name", e.target.value)}
                        className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white"
                      />
                      <input 
                        type="text" 
                        value={item.price} 
                        onChange={(e) => updateMenuItem("desserts", "items", idx, "price", e.target.value)}
                        className="w-24 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-lime-400 text-center"
                      />
                      <button 
                        onClick={() => deleteMenuItem("desserts", "items", idx)}
                        className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Promotions Editor */}
          {activeTab === "promotions" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-3 flex items-center gap-2 text-lime-400">
                <Tag className="w-6 h-6" /> Gestión de Ofertas Especiales ({selectedLang.toUpperCase()})
              </h2>

              <div className="space-y-8">
                {data[selectedLang].promotions.items.map((item, idx) => (
                  <div key={idx} className="bg-neutral-950 p-6 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lime-500 font-bold text-sm">Promoción #{idx + 1}</span>
                      <input
                        type="text"
                        placeholder="Badge (ej: Popular)"
                        value={item.badge}
                        onChange={(e) => updatePromotionItem(idx, "badge", e.target.value)}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-lime-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Título de la Promoción</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updatePromotionItem(idx, "title", e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-lime-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Descripción detallada</label>
                      <textarea
                        rows={2}
                        value={item.desc}
                        onChange={(e) => updatePromotionItem(idx, "desc", e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-lime-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Editor */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-lime-400">
                  <MessageSquare className="w-6 h-6" /> Gestión de Reseñas de Google ({selectedLang.toUpperCase()})
                </h2>
                <button
                  onClick={addReview}
                  className="px-3 py-1.5 bg-lime-500 text-black font-bold rounded-lg text-xs flex items-center gap-1 hover:bg-lime-400"
                >
                  <Plus className="w-4 h-4" /> Añadir Reseña
                </button>
              </div>

              <div className="space-y-4">
                {data[selectedLang].reviews.map((item, idx) => (
                  <div key={idx} className="bg-neutral-950 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="text"
                        placeholder="Texto de la reseña..."
                        value={item.text}
                        onChange={(e) => updateReview(idx, "text", e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-lime-500"
                      />
                      <input
                        type="text"
                        placeholder="Autor..."
                        value={item.author}
                        onChange={(e) => updateReview(idx, "author", e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-400 focus:outline-none focus:border-lime-500"
                      />
                    </div>
                    <button
                      onClick={() => deleteReview(idx)}
                      className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
