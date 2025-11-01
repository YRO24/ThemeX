import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HistoryPage.css";

function HistoryPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }, []);

  const handleBackClick = () => {
    navigate("/shop");
  };

  const purchaseHistory = [
    {
      id: "ORD-2024-001",
      date: "2024-10-28",
      items: [
        {
          name: "Gradient Dreams",
          author: "ColorFlow",
          price: 4.99,
          preview: ["🎨", "🖼️", "🌈", "✨"],
          gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        },
      ],
      total: 4.99,
      status: "completed",
      downloadable: true,
    },
    {
      id: "ORD-2024-002",
      date: "2024-10-25",
      items: [
        {
          name: "Glass Morphism Pro",
          author: "Glass UI",
          price: 6.99,
          preview: ["💎", "🔷", "💠", "🔹"],
          gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        },
        {
          name: "Neon Nights",
          author: "Neon Labs",
          price: 5.99,
          preview: ["⚡", "💫", "🔥", "💥"],
          gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        },
      ],
      total: 12.98,
      status: "completed",
      downloadable: true,
    },
    {
      id: "ORD-2024-003",
      date: "2024-10-20",
      items: [
        {
          name: "Minimal iOS Pack",
          author: "Design Studio",
          price: 0,
          preview: ["📱", "📧", "📷", "🎵"],
          gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
      ],
      total: 0,
      status: "completed",
      downloadable: true,
    },
    {
      id: "ORD-2024-004",
      date: "2024-10-15",
      items: [
        {
          name: "Dark Mode Collection",
          author: "Night Owl",
          price: 3.99,
          preview: ["🌙", "⭐", "🌌", "✨"],
          gradient: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        },
      ],
      total: 3.99,
      status: "completed",
      downloadable: true,
    },
    {
      id: "ORD-2024-005",
      date: "2024-10-10",
      items: [
        {
          name: "Nature Inspired",
          author: "Green Design",
          price: 0,
          preview: ["🌿", "🍃", "🌱", "🌳"],
          gradient: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
        },
      ],
      total: 0,
      status: "completed",
      downloadable: true,
    },
    {
      id: "ORD-2024-006",
      date: "2024-10-05",
      items: [
        {
          name: "Pastel Dreams",
          author: "Soft Design",
          price: 2.99,
          preview: ["🌸", "💕", "🦋", "✨"],
          gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        },
      ],
      total: 2.99,
      status: "completed",
      downloadable: true,
    },
  ];

  const filteredHistory = purchaseHistory.filter((order) => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

  const totalSpent = purchaseHistory.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = purchaseHistory.length;
  const totalThemes = purchaseHistory.reduce(
    (sum, order) => sum + order.items.length,
    0
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="history-page">
      <div className="history-container">
        {/* Header */}
        <div className="history-header">
          <div className="header-top">
            <button className="back-button" onClick={handleBackClick}>
              ← Back to Shop
            </button>
            <h1 className="header-title">📜 Purchase History</h1>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stats-card">
              <div className="emoji">💰</div>
              <div className="value">${totalSpent.toFixed(2)}</div>
              <div className="label">Total Spent</div>
            </div>

            <div className="stats-card">
              <div className="emoji">📦</div>
              <div className="value">{totalOrders}</div>
              <div className="label">Total Orders</div>
            </div>

            <div className="stats-card">
              <div className="emoji">🎨</div>
              <div className="value">{totalThemes}</div>
              <div className="label">Themes Owned</div>
            </div>
          </div>

          {/* Filters */}
          <div className="filters">
            <input
              type="text"
              placeholder="🔍 Search orders or themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
            <div className="filter-buttons">
              {["all", "completed", "pending"].map((status) => (
                <button
                  key={status}
                  className={`filter-btn ${
                    filterStatus === status ? "active" : ""
                  }`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {filteredHistory.length === 0 ? (
            <div className="no-orders">
              <div className="no-emoji">📭</div>
              <h2>No orders found</h2>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            filteredHistory.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <div className="order-id">Order {order.id}</div>
                    <div className="order-date">📅 {formatDate(order.date)}</div>
                  </div>
                  <div className="order-info">
                    <span
                      className={`status ${
                        order.status === "completed"
                          ? "status-completed"
                          : "status-pending"
                      }`}
                    >
                      {order.status === "completed"
                        ? "✓ Completed"
                        : "⏳ Pending"}
                    </span>
                    <div className="order-total">
                      {order.total === 0 ? "FREE" : `$${order.total.toFixed(2)}`}
                    </div>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="item-card">
                      <div
                        className="item-preview"
                        style={{ background: item.gradient }}
                      >
                        <div className="emoji-grid">
                          {item.preview.map((emoji, i) => (
                            <span key={i}>{emoji}</span>
                          ))}
                        </div>
                      </div>
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>by {item.author}</p>
                      </div>
                      <div className="item-price">
                        {item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-actions">
                  {order.downloadable && (
                    <button className="download-btn">⬇️ Download All</button>
                  )}
                  <button className="action-btn">📧 Email Receipt</button>
                  <button className="action-btn">ℹ️ View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
